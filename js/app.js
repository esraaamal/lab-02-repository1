`use strict`;

let keywordArr = [];
let productArr = []; 
let userChoose = [];

$(function(){

$.ajax({
    url: './data/page-1.json',
    dataType: 'json',
    success: (data =>{
        let product;
    
        data.forEach( value =>{
            product = new Product(value.image_url,value.title,value.keyword,value.description,value.horns);

            product.render();

        
        });
        // console.log(keywordArr);
        keywordArr.forEach ( value => {product.renderOption(value);})
        product.event1();
        }),
        
});
});

function Product (filePath,title,keyWords,description,horns){
    this.filePath = filePath;
    this.title = title;
    this.keyWords=keyWords ;
    this.description =description ;
    this.horns =horns ;
    productArr.push(this);
    if (keywordArr.includes(this.keyWords) === false){
        keywordArr.push(this.keyWords);
    }
// console.log(keywordArr);
}

Product.prototype.render = function(){
        // let subDiv = $('<div class="append1"></div>');
        // let head1 =$("<h2></h2>").text(this.title);
        // let elem =$("<li></li>").html(`<img src="${this.filePath}">`);
        //  let paragraph=$("<p></p>").text(this.description);
        // $('#showImage').append(subDiv);
        //  $('.append1').append(head1);
        // $('.append1').append(elem);
        // $('.append1').append(paragraph);
        // subDiv.removeClass('append1');
        $('img').height(300);
        $('img').width(300);
        let template = $('#neigh-template').html();
        //2- use the Mustache to render new html by merging the template with the data
        // render(string,object)
        let html = Mustache.render(template,this);
        return html;

}
// console.log(keywordArr);

Product.prototype.renderOption = function(i){
    let option = $("<option></option>").text(i);
    $('#filter').append(option);

}


Product.prototype.event1=function(){
    $("select").change(function(){
let vari= $("select").val();//$(this).val its work too
// console.log(vari);
// var selet1 =productArr.map((n)=> n.keyWords);
let select2 =productArr.filter((n) => n.keyWords === vari);
$('#showImage div').hide();
select2.forEach(value => value.render() );
console.log(select2);
// console.log(selet1);
if(vari === 'Filter By Keyword'){
$('#showImage div').show();

}
    });
}
Product.prototype.event2=function(){
    $('#sort').change(function(){
      let choose= $('#sort').val();
      console.log(choose);
      if(choose === 'text'){
        console.log('before ',productArr);
        productArr.sort((a,b) => {
          return a.title.toUpperCase() < b.title.toUpperCase();
        });
        console.log('after ',productArr);
  
        $('#showImage div').hide();
        productArr.forEach(val => val.render());
      }
      else if (choose === 'num'){
        productArr.sort((a,b) => {
          return a.horns - b.horns;});
        $('#showImage div').hide();
        console.log(productArr);
        productArr.forEach(val => val.render());
      }
    });

}