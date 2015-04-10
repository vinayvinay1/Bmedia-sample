Imageurls = [];
Imageids = [];

imgs = new Mongo.Collection("imgs");


Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", FS.Store.rootPath)],
    allow: {
        contentTypes: ['image/*']
    }
});

if(Meteor.isClient){
    Template.gifmaker.events({
        "change input[type='file']":function(event,template){
            var files=event.target.files;
            var file=files[0];

            Images.insert(file, function (err, fileObj) {
                if(!err){
                Imageids.push(fileObj._id);
                }
            });
        }
    });

    Template.myform.events({
        'submit .new-task': function(event){

            for(i in Imageids){
                Imageurls.push(Images.findOne({_id:Imageids[i]}).url());
            }
            var intvl = event.target.interval.value;
            gifshot.createGIF({
                gifWidth: 400,
                gifHeight: 400,
                images: Imageurls,
                interval: intvl,
                fontColor: '#FFFFFF'
            }, function (obj) {
                if (!obj.error) {
                    var image = obj.image;
                    //document.getElementById("gif").visibility = "visible";
                    $('#gif').show(1000);
                    document.getElementById("gif").src = image;

                }
            });
            return false;

        }
    });


    Template.image.helpers({
        /*
        images:function(){
            if (Session.get("visibility")){
                var temp = [];
                for(i in Imageids){
                    temp.push("imageurl",Images.findOne({_id:Imageids[i]}).url());
                }
                Session.set("visibility", false);
                alert(temp.toString());
                return temp;
            }
        }*/












    });

}

