const modalStyles = {
    overlay : {
     position          : 'fixed',
     top               : 0,
     left              : 0,
     right             : 0,
     bottom            : 0,
     backgroundColor   : 'rgba(0, 0, 0, 0.75)',
     zIndex            : 100
   },
   content : {
     position                   : 'absolute',
     top                        : '50%',
     left                       : '50%',
     right                      : 'auto',
     bottom                     : 'auto',
     marginRight                : '-50%',
     transform                  : 'translate(-50%, -50%)',
     background                 : '#fff',
     overflowX                  : 'hidden',
     overflowY                  : 'auto',
     WebkitOverflowScrolling    : 'touch',
     borderRadius               : '0',
     width                      : '500px',
     minHeight                  : '300px',
     maxHeight                  : '100%',
     outline                    : 'none',
     padding                    : '25px 30px',
   }
  };
  
  export default modalStyles;