var canvas = document.createElement('canvas');
canvas.width = 600;
canvas.height = 600;
var context = canvas.getContext("2d");
context.globalCompositeOperation = "source-over";
var current = 0;
draw('https://2020autumn.b-cdn.net/white.png');
function draw(a) {
    url = a;
    console.log(url)
    var request = new XMLHttpRequest()
    request.open('GET', url, true);
    request.responseType = 'blob';
    request.onload = function () {
        console.log(request)
        var reader = new FileReader();
        reader.readAsDataURL(request.response);
        console.log(reader)
        reader.onload = function (e) {
            var tempImage = new Image();
            tempImage.src = e.target.result;
            tempImage.onload = function () {
                //모드 변경
                //context.globalCompositeOperation = "darker";
                //이미지를 캔버스에 그리기
                context.drawImage(this, 0, 0, 600, 600);

                //캔버스에 그린 이미지를 다시 data-uri 형태로 변환
                var dataURI = canvas.toDataURL("image/jpeg");

                //썸네일 이미지 보여주기
                document.querySelector('#preview').src = dataURI;

                //썸네일 이미지를 다운로드할 수 있도록 링크 설정
                document.querySelector('#download').href = dataURI;
            };
        };
    };
    request.send();
    next();
}
var box = document.getElementsByClassName('box');
var wrapper = document.getElementsByClassName('wrapper');
for (a in wrapper){
  for (k in box) {
    console.log(box[k])
    box[k].setAttribute('onClick', `draw('${box[k].querySelector('img').src}')`);
}
}

function next() {
        document.getElementById(current).style.display = 'none';
        document.getElementById(current+1).style.display = '';
        current++;
}
