const http = require('http');
const download = require('../services/downloadService');
const token = 'qqcvhrm19752modk';

module.exports = (app) => {

    app.get('/api/search', (req, res) => {
        const searchTerm = req.query.q;
        const page = req.query.page;
        let path = `/api/v1/items/search?q=${searchTerm}&publicDomainOnly=true`;
        if (page) {
            path += `&page=${page}`;
        }
        const options = {
            hostname: 'api.repo.nypl.org',
            port: 80,
            path: encodeURI(path),
            headers: {
                'Authorization': `Token token=${token}`
            }
        };
        download(options).then((data) => {
            const request = JSON.parse(data.toString()).nyplAPI.request;
            const response = JSON.parse(data.toString()).nyplAPI.response;
            let items = [];
            if (!response || !response.result) {
                return res.status(200).send(items);
            }
            if (response.result.length) {
                items = response.result.map((item) => {
                    const resItem = {
                        uuid: item.uuid,
                        title: item.title,
                        typeOfResource: item.typeOfResource,
                        itemLink: item.itemLink,
                        rightsStatement: item.rightsStatement,
                    }
                    return resItem;
                });
            } else {
                const item = response.result;
                const resItem = {
                    uuid: item.uuid,
                    title: item.title,
                    typeOfResource: item.typeOfResource,
                    itemLink: item.itemLink,
                    rightsStatement: item.rightsStatement,
                }
                items.push(item);
            }
            const resObj = {
                currentPage: request.page,
                pages: request.totalPages,
                items: items
            }
            res.status(200).send(resObj);
        }).catch(error => res.status(500));
    });

    app.get('/api/details/:uuid', (req, res) => {
        const uuid = req.params.uuid;
        const options = {
            hostname: 'api.repo.nypl.org',
            port: 80,
            path: encodeURI(`http://api.repo.nypl.org/api/v1/items/item_details/${uuid}`),
            headers: {
                'Authorization': `Token token=${token}`
            }
        };
        download(options).then((data) => {
            const response = JSON.parse(data.toString()).nyplAPI.response;
            let item = {};

            if (!response || !response.mods) {
                return res.status(200).send(item);
            }

            const {
                genre,
                originInfo,
                subject,
            } = response.mods;

            const sibling_captures = response.sibling_captures;

            if (!genre) {
                item.genres = [];
            } else {
                item.genres = genre.length ? genre.map((genre) => {
                    return {
                        title: genre.$,
                        uri: genre.valueURI,
                    };
                }) : [];
                if (!genre.length) {
                    item.genres.push({
                        title: genre.$,
                        uri: genre.valueURI,
                    })
                }
            }
            if (originInfo) {
                if (originInfo instanceof Array) {
                    originInfo.forEach(element => {
                        if (element.place) {
                            item.place = element.place.placeTerm.$
                        }
                        if (element.publisher) {
                            item.publisher = element.publisher.$;
                        }
                    });
                } else {
                    item.place = originInfo.place ? originInfo.place.placeTerm.$ : null;
                    item.publisher = originInfo.publisher ? originInfo.publisher.$ : null;
                }
            }

            item.topics = [];
            if (subject) {
                if (subject.length) {
                    subject.forEach((subject) => {
                        if (subject.topic) {
                            item.topics.push(subject.topic.$);
                        }
                    });
                } else {
                    if (subject.topic) {
                        item.topics.push(subject.topic.$);
                    }
                }
            }
            const capture = sibling_captures.capture[0] ? sibling_captures.capture[0] : sibling_captures.capture;
            item.title = capture.title ? capture.title.$ : null;
            item.itemLink = capture.itemLink ? capture.itemLink.$ : null;
            item.typeOfResource = capture.typeOfResource ? capture.typeOfResource.$ : null;
            item.rightsStatement = capture.rightsStatement ? capture.rightsStatement.$ : null;
            item.image = capture.imageLinks ? capture.imageLinks.imageLink[0].$ : null;
            res.status(200).send(item);
        }).catch(error => res.status(500));
    });
}