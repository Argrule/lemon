export default function canSend() {
    const delay = 1 * 24 * 60 * 60 * 1000; // 1天    
    if(new Date().getTime() < 1703062048705 + delay){
        return true;
    }
    return false;
}