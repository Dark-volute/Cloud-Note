import Vue from 'vue';
const filters =  {
   substr: function(val){
    return (val && val.length>20) ? val.substr(20) : val
  },
   timestampToDate:function(timeStamp) {
    timeStamp = new Date(timeStamp).getTime() / 1000
    var date = new Date();
    date.setTime(timeStamp * 1000);

    let time = (new Date() / 1000 - timeStamp) / 60
    if (time < 60) {
        return Math.floor(time) + '分钟前'
    } else if (time < 60 * 24) {
        return Math.floor(time / 60) + '小时前'
    } else if (time / (24 * 60) <= 7) {
        return Math.floor(time / (24 * 60)) + '天前'
    }

    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
}
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

export default filters