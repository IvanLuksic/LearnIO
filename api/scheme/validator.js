// Source: https://gist.github.com/CacheControl/79dd9f5c7e7f798f368e#file-medium-api-parameters-middleware-js
const Ajv = require("ajv");//instalirat ovaj validator
//VALIDATOR KOJI PROVJERAVA JESU LI DANI PODACI U SKLADU SA SHEMOM
const ajv = new Ajv({ allErrors: true, removeAdditional: true });

module.exports= {
   addSchemas: (schemas)=> {/*šaljemo objekt unutar module.exports objekta koji se dodaju u for in petlji u sheme -> schemas nam predstavlja module.exports objekt koji smo 
    requirali u controleru a unutar nje se nalazi OBJEKT login koji sadrži shemu*/
/*UKRATKO NA OVAJ NAČIN ĆEMO SVE sheme DEKLARIRATI U SLJEDEĆEM OBLIKU U njihovim shema fileovima KAKO BI MOGLI U donjoj for in petlji pristupiti više shema odjednom:
module.exports={
  imesheme1{
    definicija te sheme
  },
  imesheme2:{
    defincija te sheme
  }
  ......
}
-> unutar rutera : const shema=require('put do sheme')
slanje u validator .addSchema(shema)->
-> ako želimo poslati samo 1 shemu-> onda exportamo samo jednu shemu-> const {imesheme}= require('put do sheme')-> VAŽNO-> trebamo je wrapati u neki objekt i zatim poslat unutar tog objekta u VALIDATOR JER TAKO RADI donja for in petlja
->> WRAPAMO: const wrap{
                  imesheme: imesheme
}-> pa u funkciju addschema šaljemo ovaj wrap objekt .addSchema(wrap)-> .*/ 
  for (const schema in schemas) {
    ajv.addSchema(schemas[schema], schema);//tu ce se spremit ime sheme kao 'login' jer unutar schemas koje smo poslali se nalazi objekt login kojeg ce naci for in petlja(jer ide preko svih enumrable porpertiesa i ubaciti ga pod njegoivm imenom)
  }
}
,
validate : (schemaName) => {
  return (req, res, next) => {
    let valid = ajv.validate(schemaName, req.body);
    if (!valid) {
      return res.status(400).send(errorResponse(ajv.errors));//VRAĆA STATUSNI KOD 400 U SLUČAJU LOŠE SHEME
    }
    next();//zovnit ce controller midleware funkciju kod rutera AKO JE SHEMA U REDU-> ONDA CE DOCI DOTUD INACE CE return error prije nego dode dotud
  };
}
}
/**
 * Validates incoming request bodies against the given schema,
 * providing an error response when validation fails
 * @param  {String} schemaName - name of the schema to validate
 * @return {Object} response
 */

/**
 * Format error responses
 * @param  {Object} schemaErrors - array of json-schema errors, describing each validation failure
 * @return {String} formatted api response
 */
function errorResponse(schemaErrors) {
  const errors = schemaErrors.map((error) => {
    return {
      path: error.dataPath,
      message: error.message,
    };
  });
  return { errors };
}
