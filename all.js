let add_btn = document.querySelector('.btn_add');
let input_text = document.querySelector('.text');
let tab = document.querySelector('#tab');
let doneNum = document.querySelector('.doneNum');
let data = JSON.parse(localStorage.getItem('listData')) || [];
let toggleStatus = 'all';
let list = document.querySelector('.list');
add_btn.addEventListener('click',addText);
tab.addEventListener('click',changeTab);
// 1. 新增
function addText(){
  let todo = {
  id: new Date().getTime().toString(),
  txt: input_text.value,
  checked: ''
}
  if(todo.txt != ''){
    data.unshift(todo);
    input_text.value = ''
  }else{
    alert('請輸入代辦事項吧');
  }
  updateList();
  localStorage.setItem('listData',JSON.stringify(data));
}
// 2. 渲染
function render(arr){
  let str = '';
  arr.forEach((item) => {
    str += 
      `<li data-id = "${item.id}">
        <label class="checkbox" for="">
          <input type="checkbox" ${item.checked} />
          <span>${item.txt}</span>
        </label>
        <a href="#" class="delete"></a>
      </li>`
  })
  list.innerHTML = str;
}
// 3. 刪除單筆 & 切換checked狀態內容
list.addEventListener('click',deleteItem);
function deleteItem(e){
  let id = e.target.closest('li').dataset.id;
  let index = data.findIndex((item) => item.id === id)
  if(e.target.classList.value == 'delete'){
    e.preventDefault();
    data = data.filter((item) => item.id != id);
  } else {
    data.forEach((item,index) => {
      if(item.id == id){
        if(data[index].checked=="checked"){
          data[index].checked = '';
        }else{
          data[index].checked = 'checked';
        }
      }
    })
  }
  updateList();
  localStorage.setItem('listData',JSON.stringify(data));
}
// 4. 切換選單（切換active）
function changeTab(e){
  toggleStatus = e.target.dataset.tab
  let tabs = document.querySelectorAll('#tab li');
  tabs.forEach((item) => {
    item.classList.remove('active');
  });
  e.target.classList.add('active');
  updateList();
  localStorage.setItem('listData',JSON.stringify(data));
}
// 5. 更新list
function updateList(){
  let showData = [];
  if(toggleStatus == 'all'){
    showData = data;
  } else if(toggleStatus == 'unDone'){
    showData = data.filter((item) => item.checked == '');
  } else{
    showData = data.filter((item) => item.checked == 'checked');
  }
  let todoLength = data.filter((item) => item.checked == '');
  doneNum.textContent = todoLength.length;
  render(showData);
  localStorage.setItem('listData',JSON.stringify(data));
}
updateList();
// 6. 刪除完成事項
let deleteAll = document.querySelector('.deleteAll');
deleteAll.addEventListener('click',deleteDones);
function deleteDones(e){
  e.preventDefault();
  data = data.filter((item) => item.checked != 'checked');
  updateList();
  localStorage.setItem('listData',JSON.stringify(data));
}
// 7. 優化
input_text.addEventListener('keypress',function(e){
  if(e.key == 'Enter'){
    addText();
  }
  localStorage.setItem('listData',JSON.stringify(data));
});