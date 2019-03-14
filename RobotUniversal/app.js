//Comentario para git commit
//var async = require('async');
require('chromedriver');
const {Builder, By, until} = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');
var chromeCapabilities = webdriver.Capabilities.chrome();
var chromeOptions = {'args': ['--test-type', '--start-maximized','--headless']};
var chromeOptions = {'args': ['--test-type', '--start-maximized']};
chromeCapabilities.set('chromeOptions', chromeOptions);
let driver = new Builder().withCapabilities(chromeCapabilities).build();

var aux = [];
var aux1 = [];
var data = [];
var dataOK = [];
var links = [];

urlFuente();

function urlFuente(){

	driver.get('https://www.eluniversal.com.mx/');
	driver.wait(until.elementLocated(By.id('universallogo'),5000)).then(null, function(){
		console.log('error al cargar la página');
		/*$insertar errores de ejecucion de robots funcion--$*/
	});
	news();
}

/*$#################################################################################################$*/
function news(){

	driver.wait(until.elementLocated(By.className('universal-boton-despliega'),10000)).then(function(){
		console.log('class boton-link found');
		driver.sleep(7000);
		driver.findElement(By.xpath('//*[@id="universal-menu-primero"]/div[1]')).click();
		driver.sleep(1000);
		driver.findElement(By.xpath('//*[@id="universal-header-bottom"]/div[7]/ul/li[3]/a')).click();
		console.log('seccion metropoli|||');

		//#zone-content-wrapper
		driver.wait(until.elementLocated(By.className('nombre-seccion'),15000)).then( function(){
			driver.sleep(10000);
			driver.findElement(By.id('zone-content-wrapper')).getAttribute('innerHTML').then( function(html){

				html = html.replace('>','').replace(/\n/g,'').replace('</a>','').replace('</div>','').trim();
				html = html.split('<div');

				for(var i = 0; i < html.length-1; i++){

					if(html[i].indexOf('href=') != -1){
						aux = html[i].split('>');
						for(var j = 0;j < aux.length; j++) {
            				aux[j] = aux[j].replace('<','').replace('/div','').replace('/span','').replace('/a','').replace('"','').replace('a href=','').split(/\<[^\>]*\>/ig);
       					}
       					data.push(aux);
					}

				}


				for(var i =0 ; i < data.length-1; i++){

					if(data[i].length == 7 || data[i].length == 11 || data[i].length == 4){ links.push(data[i][2]);	}

					if(data[i].length == 9 || data[i].length == 13 || data[i].length == 14){ links.push(data[i][4]); }

					if(data[i].length == 10){ links.push(data[i][1]); }

					if(data[i].length == 15){ links.push(data[i][6]); }

				}


				console.log('fffffff'+links.length);
				console.log(links);

				for(var j = 0; j < links.length-1 ; j++){
					if(links[j].indexOf('metropoli') != -1){
						dataOK.push(links[j]);
					}

				}

				console.log(dataOK);
			});
		});
});
}
/*$##########################################################################################################################################$*/

function downloadDataLinks(links){
  console.log(links);
}
