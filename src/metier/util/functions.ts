export function swap(array:Array<string>, indexA:number, indexB:number):void {
    let c = array[indexA];
    array[indexA] = array[indexB]
    array[indexB] = c;
}