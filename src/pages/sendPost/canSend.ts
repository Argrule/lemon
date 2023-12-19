export default function canSend() {
    const delay = 7 * 24 * 60 * 60 * 1000; // 7天    
    if(new Date().getTime() < 1702996457018 + delay){
        return true;
    }
    return false;
}