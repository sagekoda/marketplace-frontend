/**
 * @desc Appliaction Validation
 * @author Odewale Ifeoluwa
 */
class Validator {
  static isEmail(email) {
    const filter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return filter.test(email);
  }

  static isEmpty(value) {
    return value.length === 0;
  }

  static exactHeight(imgHeight, height) {
    return parseInt(imgHeight, 10) !== parseInt(height, 10);
  }

  static minHeight(imgHeight, height) {
    return parseInt(imgHeight, 10) < parseInt(height, 10);
  }

  static maxHeight(imgHeight, height) {
    return parseInt(imgHeight, 10) > parseInt(height, 10);
  }

  static exactWidth(imgWidth, Width) {
    return parseInt(imgWidth, 10) !== parseInt(Width, 10);
  }

  static minWidth(imgWidth, Width) {
    return parseInt(imgWidth, 10) < parseInt(Width, 10);
  }

  static maxWidth(imgWidth, Width) {
    return parseInt(imgWidth, 10) > parseInt(Width, 10);
  }

  static minStrLen(str, number) {
    return str.length < parseInt(number, 10);
  }

  static maxStrLen(str, number) {
    return str.length > parseInt(number, 10);
  }

  static contained(value, array){
    return array.indexOf(value) < 0;
  }

  static propertyExist(mainObject, mainProps, subProps = null, subSubProps = null, subSubSubProps = null){

    if(subProps === null){
      return mainObject.hasOwnProperty(mainProps);
    }else if(subSubProps === null){
      return mainObject.hasOwnProperty(mainProps) && mainObject[mainProps].hasOwnProperty(subProps);
    }else if(subSubSubProps === null){
      return mainObject.hasOwnProperty(mainProps) && mainObject[mainProps].hasOwnProperty(subProps) && mainObject[mainProps][subProps].hasOwnProperty(subSubProps);
    }else{
      return mainObject.hasOwnProperty(mainProps) && mainObject[mainProps].hasOwnProperty(subProps) && mainObject[mainProps][subProps].hasOwnProperty(subSubProps) && mainObject[mainProps][subProps][subSubProps].hasOwnProperty(subSubSubProps);
    }

  }
}


export default Validator;
