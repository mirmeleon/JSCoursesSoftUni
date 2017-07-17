function solve(a,b) {
    return other(a,b);

    function other(a,b){
        if(b==0) return a;
        else return other(b,a%b);
    }
}