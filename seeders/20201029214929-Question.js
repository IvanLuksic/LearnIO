'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
     await queryInterface.bulkInsert('Question',
     [{"text":"Suspendisse potenti. Cras in purus eu magna vulputate luctus.","solution":"a","question_type":1,"row_D":1,"column_A":1,"answer_a":"Vesaccumsneifend.. Ms. In lacinia sapien quis libero.","answer_b":"In sagittis dui vel niss, lec hac habitasse passa quis asi at nibh.","answer_c":"Mauris enim leo, rhoncus sed,  sapien quis libero.","answer_d":"Cras mi pede, malesuada in, imperdiet et, commodo vulper adipiscing elit.","topic_id":1},
{"text":"Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus . Cum socirum rutrum neque.","solution":"c","question_type":1,"row_D":2,"column_A":2,"image_path":"m","answer_a":"Pellentesque rtis est. Phasellus siis eu sapien cursus vestibulum. Proin eu mi.","answer_b":"Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.","answer_c":"Vestibulum ante ipsum primil est. Dom ac esmperdis justo. In hac habitasse platea dictumst.","answer_d":"Suspendisse ornare cin, tempus sit ar pede justo eu massa. Donec dapibus.","topic_id":2},
{"text":"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.","solution":"c","question_type":1,"row_D":1,"column_A":2,"answer_a":"Nam congue, risus semper porta volutpat, quam pede lobore at nulla. Suspendisse potenti.","answer_b":"Suspendisse accumsan tortor quis turpis.","answer_c":"Vivamus metusla tempus. Vivamus in felis eu sapien cursus vestibulum.","answer_d":"Integer ac leo. Pellentesque ulaugue, a suscipitortor eu pede.","topic_id":1},
{"text":"Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, r quis justo.","solution":"d","question_type":1,"row_D":2,"column_A":3,"answer_a":"utpat sapien arcu sed augue platea dictumst.","answer_b":"Phas molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus.","answer_c":"Duis a sapien quis libero.","answer_d":"Pellenque volutpat dui. Maemagna, ac co Morbi non lectus.","topic_id":1},
{"text":"Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis egeulDonec odique.","solution":"c","question_type":1,"row_D":2,"column_A":1,"answer_a":"Maecenas pulvinar lovestibulum.","answer_b":"Curabitur at  ullamcorper purus sit amet nulla.","answer_c":"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augueia erat.","answer_d":"Donec ut dolor. Morbien quis libero.","topic_id":1},
{"text":"Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis gue.","solution":"c","question_type":1,"row_D":3,"column_A":3,"answer_a":"Vivamus vel nulla eget econsequat varius.","answer_b":"Praesent blandtincidunt eget, tempus vel, pede. Mo sem. Fusce consequat.","answer_c":"Suspendisse potenti. Cras in purus eu magna vulputate luctus.","answer_d":"Lorem ipsum dolor sinc. Donec quis orci eget orci vehicula condimentum.","topic_id":2},
{"text":"Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nentum.","solution":"a","question_type":1,"row_D":1,"column_A":2,"answer_a":"Aliquam quis turpis eget mus tortean fermentum.","answer_b":"In blasit . Vivamit at, vulputate vitae, nisl.","answer_c":"Integer ac neque. Duis bibendum. Mortrum. lectus.","answer_d":"Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pedeistique, est et temt nunc. Vestiti.","topic_id":1},
{"text":"Morbi vestibulum, velVivamus tortor. Duis mattis egestas metus. Aenean fermentum.","solution":"120","question_type":2,"row_D":2,"column_A":3,"topic_id":1}]);
     
  },

  down: async (queryInterface, Sequelize) => {
   
    await queryInterface.bulkDelete('Question', null, {});
    
  }
};
