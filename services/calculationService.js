function calculateRatio(num_1, num_2){
    
    for(num=num_2; num>1; num--) {
        if((num_1 % num) == 0 && (num_2 % num) == 0) {
            num_1=num_1/num;
            num_2=num_2/num;
        }
    }
    let length1 = (num_1*240)/num_2
    let length2 = (num_1*720)/num_2
    let obj = {
        l1 : length1,
        w1 : 240,
        l2 : length2,
        w2 : 720
    }
    return obj;
}
module.exports = calculateRatio