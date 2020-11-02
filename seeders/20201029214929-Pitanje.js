'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
     await queryInterface.bulkInsert('Pitanje',
     [{"tekst":"Suspendisse potenti. Cras in purus eu magna vulputate luctus.","rjesenje":"a","tip_pitanja":1,"redak_D":1,"stupac_A":1,"odgovor_a":"Vesaccumsneifend.. Ms. In lacinia sapien quis libero.","odgovor_b":"In sagittis dui vel niss, lec hac habitasse passa quis asi at nibh.","odgovor_c":"Mauris enim leo, rhoncus sed,  sapien quis libero.","odgovor_d":"Cras mi pede, malesuada in, imperdiet et, commodo vulper adipiscing elit.","topic_id":1},
{"tekst":"Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus . Cum socirum rutrum neque.","rjesenje":"c","tip_pitanja":1,"redak_D":2,"stupac_A":2,"slika_path":"m","odgovor_a":"Pellentesque rtis est. Phasellus siis eu sapien cursus vestibulum. Proin eu mi.","odgovor_b":"Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.","odgovor_c":"Vestibulum ante ipsum primil est. Dom ac esmperdis justo. In hac habitasse platea dictumst.","odgovor_d":"Suspendisse ornare cin, tempus sit ar pede justo eu massa. Donec dapibus.","topic_id":2},
{"tekst":"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.","rjesenje":"c","tip_pitanja":1,"redak_D":1,"stupac_A":2,"odgovor_a":"Nam congue, risus semper porta volutpat, quam pede lobore at nulla. Suspendisse potenti.","odgovor_b":"Suspendisse accumsan tortor quis turpis.","odgovor_c":"Vivamus metusla tempus. Vivamus in felis eu sapien cursus vestibulum.","odgovor_d":"Integer ac leo. Pellentesque ulaugue, a suscipitortor eu pede.","topic_id":1},
{"tekst":"Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, r quis justo.","rjesenje":"d","tip_pitanja":1,"redak_D":2,"stupac_A":3,"odgovor_a":"utpat sapien arcu sed augue platea dictumst.","odgovor_b":"Phas molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus.","odgovor_c":"Duis a sapien quis libero.","odgovor_d":"Pellenque volutpat dui. Maemagna, ac co Morbi non lectus.","topic_id":1},
{"tekst":"Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis egeulDonec odique.","rjesenje":"c","tip_pitanja":1,"redak_D":2,"stupac_A":1,"odgovor_a":"Maecenas pulvinar lovestibulum.","odgovor_b":"Curabitur at  ullamcorper purus sit amet nulla.","odgovor_c":"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augueia erat.","odgovor_d":"Donec ut dolor. Morbien quis libero.","topic_id":1},
{"tekst":"Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis gue.","rjesenje":"c","tip_pitanja":1,"redak_D":3,"stupac_A":3,"odgovor_a":"Vivamus vel nulla eget econsequat varius.","odgovor_b":"Praesent blandtincidunt eget, tempus vel, pede. Mo sem. Fusce consequat.","odgovor_c":"Suspendisse potenti. Cras in purus eu magna vulputate luctus.","odgovor_d":"Lorem ipsum dolor sinc. Donec quis orci eget orci vehicula condimentum.","topic_id":2},
{"tekst":"Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nentum.","rjesenje":"a","tip_pitanja":1,"redak_D":1,"stupac_A":2,"odgovor_a":"Aliquam quis turpis eget mus tortean fermentum.","odgovor_b":"In blasit . Vivamit at, vulputate vitae, nisl.","odgovor_c":"Integer ac neque. Duis bibendum. Mortrum. lectus.","odgovor_d":"Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pedeistique, est et temt nunc. Vestiti.","topic_id":1},
{"tekst":"Morbi vestibulum, velVivamus tortor. Duis mattis egestas metus. Aenean fermentum.","rjesenje":"120","tip_pitanja":2,"redak_D":2,"stupac_A":3,"topic_id":1}]);
     
  },

  down: async (queryInterface, Sequelize) => {
   
    await queryInterface.bulkDelete('Pitanje', null, {});
    
  }
};
