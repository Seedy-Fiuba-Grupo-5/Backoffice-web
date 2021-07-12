const types = ["Art","Comics","Crafts","Dance","Design","Fashion","Film & Video","Food",
    "Games","Journalism","Music","Photography","Publishing","Technology","Theater","Other"];

class ReportGenerator {
    static createTypeReport(projects){
        let data = [];
        const iterations = types.length;
        for(let i = 0; i < iterations; i++){
            let len = projects.filter(function(item){
                return item.type === types[i];
            }).length;
            data.push({type: types[i], count: len});
        }
        return data;
    }
}

export default ReportGenerator;