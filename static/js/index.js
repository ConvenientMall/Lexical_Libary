// This will be the object that will contain the Vue attributes
// and be used to initialize it.
let app = {};


// Given an empty app object, initializes it filling its attributes,
// creates a Vue instance, and then initializes the Vue instance.
let init = (app) => {

    // This is the Vue data.
    app.data = {
        add_mode: false,
        add_post: "",
        posts: [],
        current_email: "",
        name: "",
    };

    app.enumerate = (a) => {
        // This adds an _idx field to each element of the array.
        let k = 0;
        a.map((e) => {e._idx = k++;});
        return a;
    };

    


    app.upvote = (pst_idx) => {
        let pst = app.vue.posts[pst_idx];
        if(pst.upvoted){
            pst.upvoted = false;
            pst.downvoted = false;
            pst.up_over= pst.up_over.replace('- '+ app.vue.name,'');
        } 
        else{
            pst.upvoted = true;
            pst.downvoted = false;
            pst.up_over += "- " + app.vue.name;
            pst.down_over= pst.down_over.replace('- '+ app.vue.name,'');
        }
            


        axios.post(set_rating_url, {post_id: pst.id, upvoted: pst.upvoted, downvoted: pst.downvoted});
    };
    app.downvote = (pst_idx) => {
        let pst = app.vue.posts[pst_idx];
        if(pst.downvoted){
            pst.upvoted = false;
            pst.downvoted = false;
            pst.down_over= pst.down_over.replace('- '+ app.vue.name,'');
            
        } else{
            pst.upvoted = false;
            pst.downvoted = true;
            pst.down_over += "- " + app.vue.name;
            pst.up_over= pst.up_over.replace('- '+ app.vue.name,'');
        }

        axios.post(set_rating_url, {post_id: pst.id, upvoted: pst.upvoted, downvoted: pst.downvoted});
    };
    app.thumbs_out = (pst_idx) => {
        let pst = app.vue.posts[pst_idx];
        pst.display = false;

    }
    app.thumbs_over = (pst_idx) => {
        let pst = app.vue.posts[pst_idx];
        pst.display = true;
    }
    app.publish = function () {
        axios.post(add_post_url,
            {
                posting: app.vue.add_post,
            }).then(function (response) {
            app.vue.posts.push({
                up_over:"Upvoted by",
                down_over:"Downvoted by",
                display:false,
                trash: true,
                upvoted: false,
                downvoted: false,
                id: response.data.id,
                post: app.vue.add_post,
                name: app.vue.name,
                created_by:app.vue.current_email,
            });
            app.enumerate(app.vue.posts);
            app.reset_form();
            app.set_add_status(false);
        });
    };

    app.reset_form = function () {
        app.vue.add_post = "";
    };


    app.delete_post = function(row_idx) {
        let id = app.vue.posts[row_idx].id;
        axios.get(delete_post_url, {params: {id: id}}).then(function (response) {
            for (let i = 0; i < app.vue.posts.length; i++) {
                if (app.vue.posts[i].id === id) {
                    app.vue.posts.splice(i, 1);
                    app.enumerate(app.vue.posts);
                    break;
                }
            }
            });
    };

    app.set_add_status = function (new_status) {
        app.vue.add_mode = new_status;
    };

    app.get_email = function(p_email){
        return app.vue.current_email === p_email;
    };

    // This contains all the methods.
    app.methods = {
        thumbs_out: app.thumbs_out,
        thumbs_over: app.thumbs_over,
        delete_post: app.delete_post,
        get_email: app.get_email,
        reset_form : app.reset_form,
        enumerate:app.enumerate,
        set_add_status: app.set_add_status,
        publish: app.publish,
        upvote: app.upvote,
        downvote: app.downvote,

        mouseover: function(){
            this.message = 'Good!'
          },    
        mouseleave: function(){
            this.message = 'Hover Me!'
        }
    };



    // This creates the Vue instance.
    app.vue = new Vue({
        el: "#vue-target",
        data: app.data,
        methods: app.methods
    });

    // And this initializes it.
    app.init = () => {
        // Put here any initialization code.
        // Typically this is a server GET call to load the data.
        axios.get(load_email_url).then(function (response) {
            app.vue.current_email = response.data.email;
            axios.get(load_posts_url).then(function (response) {
                let posties = response.data.rows;
                app.enumerate(posties);
                app.vue.posts = posties;
                });
            
            })
            .then(() => {
                for (let pst of app.vue.posts) {
                    axios.get(get_rating, {params: {"post_id": pst.id}})
                        .then((result) => {

                            //add some stuff here to get the upvoters
                        });
                }
            });

            
            axios.get(load_name_url).then(function (response) {
                app.vue.name = response.data.name;
                
            });
    };


    // Call to the initializer.
    app.init();
};

  
// This takes the (empty) app object, and initializes it,
// putting all the code i
init(app);
