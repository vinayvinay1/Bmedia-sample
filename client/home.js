Imageurls = [];
Imageids = [];
id = '';

Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", FS.Store.rootPath)],
    allow: {
        contentTypes: ['image/*']
    }
});

if(Meteor.isClient){
    Template.gifmaker.created = function(){
        this.state = new ReactiveDict();
        this.state.set('thumbnails', false);
        this.state.set('imagesrc', '');
        this.state.set('_id', '');
    };

    Template.gifmaker.events({
        "change input[type='file']":function(event,template){
            //template.state.set('thumbnails', true);
            var files=event.target.files;
            var file=files[0];

            Images.insert(file, function (err, fileObj) {
                if(!err){
                Imageids.push(fileObj._id);
                    id = fileObj._id;
                }
                template.state.set('thumbnails', true);
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

    Template.gifmaker.helpers({
        thumbnails : function(){
            return Template.instance().state.get('thumbnails');
        },
        imagesrc : function(){
            if (id){
                Template.instance().state.set('imagesrc', Images.findOne({_id: id}).url());
                return Template.instance().state.get('imagesrc');
            }meteor
        }
    });

}

