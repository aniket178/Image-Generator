import { surpriseMePrompts } from "../constants";
import filesaver from 'file-saver';
export const getRandomPrompt = (prompt) =>{
    const promptindex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomprompt = surpriseMePrompts[promptindex];
    if(randomprompt === prompt) return getRandomPrompt(randomprompt);
    return randomprompt;
}

export const downloadImage = async (_id, photo) => {
    filesaver.saveAs(photo, `download-${_id}.jpg`)
}