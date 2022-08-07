
let $addItem = $('.addItem')
let items = JSON.parse(localStorage.getItem('items')) || []
console.log(items)
function render(){
    $addItem.siblings().remove()
    items.forEach((item,index)=>{
        const $newItem = $(`
         <li class="item">
            <div class="itemIcon">${simiplifyUrl(item.itemUrl)[0].toUpperCase()}</div>
            <div class="itemUrl">${simiplifyUrl(item.itemUrl)}</div>
            <div class="closeIcon">
                <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                </svg>
            </div> 
        </li>
        `)
        $addItem.before($newItem)
        $newItem.on('click',()=>{
            window.open(item.itemUrl)
        })
        $newItem.find('.closeIcon').on('click',(e)=>{
            e.stopPropagation()
            console.log(index);
            items.splice(index,1)
            render()
        })
    })

}
function simiplifyUrl(url){
    return url.replace(/http:\/\//i, '').replace(/https:\/\//i,'').replace(/www./i,'').replace(/\/.*/,'')
}
render()

$addItem.on('click', ()=>{
    let newItem = prompt('请输入要添加的网址')
    if(!newItem.match(/http/)){
        newItem = 'https://'+ newItem
    }
    console.log(newItem)
    items.push({
        'itemUrl': newItem
    })
    render()
})
window.onbeforeunload=()=>{
    localStorage.setItem('items',JSON.stringify(items))
}
document.addEventListener('keyup', (e)=>{
    for(let i=0; i<items.length; i++){
        if(simiplifyUrl(items[i].itemUrl)[0] === e.key){
            window.open(items[i].itemUrl)
            break
        }

    }
})