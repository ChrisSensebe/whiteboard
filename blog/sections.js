var sections = [
    {'id': 0, 'sectionTitle': 'Accueil', 'articles': 'Section Accueil'},
    {'id': 1, 'sectionTitle': 'Code', 'articles': 'Section Code'},
    {'id': 2, 'sectionTitle': 'Raspberrypi', 'articles': 'Section Raspberrypi'},
    {'id': 3, 'sectionTitle': 'Photo', 'articles': 'Section Photo'},
    {'id': 4, 'sectionTitle': 'Autres', 'articles': 'Section Autres'}
];

exports.getSections = function(){
    return sections;
};

exports.getSection = function(id){
    for(var i=0; i<sections.length; i++){
        if(i == id){
            return sections[id];
        }
    }
};