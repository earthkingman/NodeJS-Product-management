const http = require('http');   //http 모듈 로드
const url = require('url');     //url 모듈 로드    
const querystring = require('querystring');  //quertstring 모듈 로드

const server = http.createServer((req, res) => { // 서버 생성, 요청이 들어올 때마다 매번 콜백 함수 실행 
    let method = req.method; // 메서드 정보 ex(GET인지 POST인지)
    let uri = url.parse(req.url, true); // url속성을 파싱
    let pathname = uri.pathname; // URI정보를 얻어옴

    if (methods === 'POST' || method === "PUT") {  //POST, PUT일 경우
        var body = "";

        req.on('data', function (data) { //request에서 ‘data’라는 이름의 event가 발생한 경우, function(data){} 라는 이벤트 핸들러를 실행한다.
            body += data;
        });
        req.on('end', function () {
            var params;
            if (req.headers['content-type'] == "application/json") { //헤더가 json일 경우
                params = JSON.parse(body);
            }
            else //json이 아닐 경우
            {
                params = querystring.parse(body);
            }
            onRequest(res, method, pathname, uri.query);
        });
    }
}).listen(8000);

function onRequest(res, method, pathname, params){ //var 변수 선언과 함수선언문에서만 호이스팅
    res.end("respond !");
}