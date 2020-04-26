import ReactHtmlParser from 'react-html-parser'; 

export const showErrors = (errors: string[]) => {

    if(errors !== undefined) {
        if(typeof errors === 'string') return errors;
        else {
           var errorList = errors.reduce(function (result, error) {
            return result + error + '<br />';
            }, '');
            return ReactHtmlParser(errorList); 
        }
        
    } else return '';
    
}