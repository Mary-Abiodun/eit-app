FlowRouter.route('/', {
    // do some action for this route
    action: function(params, queryParams) {
        // console.log("Params:", params);
        // console.log("Query Params:", queryParams);
        BlazeLayout.render('home');
    },

    name: "home" // optional
});

FlowRouter.route('/edit/:id', {
    // do some action for this route
    action: function(params, queryParams) {
        // console.log("Params:", params);
        // console.log("Query Params:", queryParams);
        BlazeLayout.render('edit');
    },

    name: "edit" // optional
});
