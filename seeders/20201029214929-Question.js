'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
     await queryInterface.bulkInsert('Question',
     [{"text":"PITANJE1.","solution":"a","question_type":1,"row_D":1,"column_A":1,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE2.","solution":"a","question_type":1,"row_D":1,"column_A":1,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE3","solution":"a","question_type":1,"row_D":1,"column_A":1,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE1","solution":"a","question_type":1,"row_D":1,"column_A":2,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE3","solution":"a","question_type":1,"row_D":1,"column_A":2,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE1","solution":"a","question_type":1,"row_D":1,"column_A":3,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE2","solution":"a","question_type":1,"row_D":1,"column_A":3,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE1","solution":"a","question_type":1,"row_D":2,"column_A":1,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE2","solution":"a","question_type":1,"row_D":2,"column_A":1,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE3","solution":"a","question_type":1,"row_D":2,"column_A":1,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE1","solution":"a","question_type":1,"row_D":2,"column_A":2,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE2","solution":"a","question_type":1,"row_D":2,"column_A":2,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE1","solution":"a","question_type":1,"row_D":2,"column_A":3,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE2","solution":"a","question_type":1,"row_D":2,"column_A":3,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE3","solution":"a","question_type":1,"row_D":2,"column_A":3,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE1","solution":"a","question_type":1,"row_D":3,"column_A":1,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE1","solution":"a","question_type":1,"row_D":3,"column_A":2,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE2","solution":"a","question_type":1,"row_D":3,"column_A":2,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE1","solution":"a","question_type":1,"row_D":3,"column_A":3,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE2","solution":"a","question_type":1,"row_D":3,"column_A":3,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE3","solution":"a","question_type":1,"row_D":3,"column_A":3,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE1","solution":"a","question_type":1,"row_D":4,"column_A":1,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE2","solution":"a","question_type":1,"row_D":4,"column_A":1,"answer_a":"Vesaccumsneife.","answer_b":"In asi at nibh.","answer_c":"Mauris enim leo, rhoncusro.","answer_d":"Crmpeit.","topic_id":1},
     {"text":"PITANJE1.","solution":"c","question_type":1,"row_D":4,"column_A":2,"answer_a":"Nisse potenti.","answer_b":"Surpis.","answer_c":"Vivasulum.","answer_d":"Ipede.","topic_id":1},
    {"text":"PITANJE2.","solution":"d","question_type":1,"row_D":4,"column_A":2,"answer_a":"utictumst.","answer_b":"Phaectus.","answer_c":"Duiis libero.","answer_d":"Pel ectus.","topic_id":1},
    {"text":"PITANJE3.","solution":"c","question_type":1,"row_D":4,"column_A":2,"answer_a":"Maecenas.","answer_b":"Cula.","answer_c":"Curat.","answer_d":"Doero.","topic_id":1},
    {"text":"PITANJE1.","solution":"a","question_type":1,"row_D":4,"column_A":3,"answer_a":"Altum.","answer_b":"In sl.","answer_c":"Itus.","answer_d":"d, ljuiti.","topic_id":1},
    {"text":"PITANJE2.","solution":"120","question_type":2,"row_D":4,"column_A":3,"topic_id":1},
    {"text":"PITANJE3.","solution":"120","question_type":2,"row_D":4,"column_A":3,"topic_id":1},
    {"text":"PITANJE1.","solution":"120","question_type":2,"row_D":5,"column_A":1,"topic_id":1},
    {"text":"PITANJE2.","solution":"120","question_type":2,"row_D":5,"column_A":1,"topic_id":1},
    {"text":"PITANJE3.","solution":"120","question_type":2,"row_D":5,"column_A":1,"topic_id":1},
    {"text":"PITANJE1.","solution":"120","question_type":2,"row_D":5,"column_A":2,"topic_id":1},
    {"text":"PITANJE2.","solution":"120","question_type":2,"row_D":5,"column_A":2,"topic_id":1},
    {"text":"PITANJE3.","solution":"120","question_type":2,"row_D":5,"column_A":2,"topic_id":1},
    {"text":"PITANJE4.","solution":"120","question_type":2,"row_D":5,"column_A":2,"topic_id":1},
    {"text":"PITANJE1.","solution":"120","question_type":2,"row_D":5,"column_A":3,"topic_id":1},
    {"text":"PITANJE2.","solution":"120","question_type":2,"row_D":5,"column_A":3,"topic_id":1},
    {"text":"PITANJE3.","solution":"120","question_type":2,"row_D":5,"column_A":3,"topic_id":1},
    {"text":"PITANJE4.","solution":"120","question_type":2,"row_D":5,"column_A":3,"topic_id":1},
    {"text":"PITANJE5.","solution":"120","question_type":2,"row_D":5,"column_A":3,"topic_id":1},
    ]);
     
  },

  down: async (queryInterface, Sequelize) => {
   
    await queryInterface.bulkDelete('Question', null, {});
    
  }
};
