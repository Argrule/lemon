export default function canSend() {
    const delay = 3 * 60 * 60 * 1000; // 3小时    
    if(new Date().getTime() < 1703134349329 + delay){
        return true;
    }
    return false;
}