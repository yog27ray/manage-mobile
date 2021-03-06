'use strict';

angular.module('uiGenApp')
  .controller('DashboardController', function(QuarcService, Restangular, moment,$scope) {
    const Page = QuarcService.Page;

    const vm = this;

    Page.setTitle('Dashboard');
    vm.Math = Math;
    vm.summary= {};
    vm.summary.EPCScreening = {size:60, animate:{duration:0,enabled:false},barColor:'#3950a0',scaleColor:false,lineWidth:5,lineCap:'butt'};
    vm.summary.EPCShortlist = {size:60, animate:{duration:0,enabled:false},barColor:'#187889',scaleColor:false,lineWidth:5,lineCap:'butt'};


    vm.getSummary = function getSummary() {
      Restangular
      .one('clients/dashboard')
      .get()
      //.get({ state_id: '1,5,8,9,17' })
      .then(function gotSummary(response) {
        vm.summary = response


        //vm.summary = {
        //    cv: response[1] || 0,
        //    interview: response[9] || 0,
        //    await_interview: [
        //      response[5] || 0,
        //      response[8] || 0,
        //      response[17] || 0,
        //    ].reduce((a, b) => a + b),
        //  };
        //
        //  vm.chart = {
        //    labels: ['Awaiting Interviews', 'AF on CV', 'AF on Interview'],
        //    data: [vm.summary.await_interview, vm.summary.cv, vm.summary.interview],
        //  };
        });
    };

    vm.getSummary();

    vm.getPipeline = function getPipeline() {
      Restangular
        .one('summary/pipeline')
        .get()
        .then(function gotPipeline(response) {
          vm.pipeline = response;
        });
    };

    vm.getPipeline();

    vm.getInterviews = function getInterviews() {
      Restangular
        .one('applicants')
        .get({
          fl: 'id,name,interview_type,interview_time,_root_',
          sort: 'interview_time ASC',
          interview_time: [
            moment().startOf('day').toISOString(),
            moment().endOf('week').toISOString(),
          ].join(','),
        })
        .then(function gotInterviews(response) {
          vm.interviews = response;
        });
    };

    vm.getInterviews();
  });


