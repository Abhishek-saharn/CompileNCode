var identifier = null;
var session;
var tracker = {
               ansic:"#include<stdio.h>\nvoid main(){\n\n}",
                    ansic_max:"int max(int a, int b)\n{\n\treturn (a>b)?a:b;\n}",
                    ansic_swap:"int swap(int *a, int *b)\n{\n\tint temp = *a;\n\t*a= *b;\n\t*b= temp;\n}",
               cpp11:"#include<iostream>\nusing namespace std;\nint main(){\nreturn 0;\n}",
               java:"import java.util.*;\nclass template{\npublic static void main(String arg[]){\n\n\t}\n}",
               python:"var x =raw_input();\n print x;"};


var editor = ace.edit("editor");
document.getElementById('editor').style.fontSize='12px';

 editor.setTheme("ace/theme/textmate");
        session = editor.getSession();
        session.setUseWrapMode(true);
        session.setUseWorker(false);
        session.setMode("ace/mode/javascript");

session.setValue(tracker.ansic);
session.setMode("ace/mode/c_cpp");

function myfunc(){

   var e= window.event,
	btn=e.target;
//alert("workinghere");
	if(btn.id=="ansi_c"){
	editor.setValue(tracker.ansic);
   // session=editor.getSession();
	editor.getSession().setMode("ace/mode/c_cpp");

	}

   if(btn.id=="ansicmaxcode"){
	editor.insert(tracker.ansic_max);
	editor.getSession().setMode("ace/mode/c_cpp");
	}


   if(btn.id=="ansicswapcode"){
	editor.insert(tracker.ansic_swap);
	editor.getSession().setMode("ace/mode/c_cpp");
	}

	if(btn.id=="cpp_11"){
	//alert("hello");
	editor.setValue(tracker.cpp11);
       editor.getSession().setMode("ace/mode/c_cpp");
	}

	if(btn.id=="java__"){
	editor.setValue(tracker.java);
	editor.getSession().setMode("ace/mode/java");
	}
	if(btn.id=="python__"){
	editor.setValue(tracker.python);
       editor.getSession().setMode("ace/mode/java");
	}
}
function compile() {
  var activeTab = $(".tab-content").find(".active");
  var value = activeTab.attr('value');
  //alert(value);

        $.post("/compile", {code: session.getValue(), language: value})
            .done(function(data) {
                console.log("hell");
                $("#output-container").text("Compile status: " + JSON.parse(data).compile_status);
            })
            .fail(function(data) {
                console.log(data);
                $("#output-container").text("Compilatiion failed!");
            }
        );
    }
function run() {
  var activeTab = $(".tab-content").find(".active");
  var value = activeTab.attr('value');
  //alert(value);

        $.post("/run", {code: session.getValue(), language: value})
            .done(function(data) {
                console.log(data);
                data = JSON.parse(data);
                if(data.run_status.status === "AC") {
                    $("#output-container").html(data.run_status.output_html);
                } else if(data.run_status.status === "CE") {
                    $("#output-container").text("Compile Error: " + data.run_status.status_detail);
                } else {
                    $("#output-container").html(data.run_status.output_html);
                }
            })
            .fail(function(data) {
                console.log(data);
                $("#output-container").text("Run operation failed!");
            }
        );
    }
//function compile(){
//
////    $.post("/compile", function(data, status){
////        alert("Data: " + data + "\nStatus: " + status);
////    });
//
//    var data2=editor.getValue();
//    $.post("/compile",{code:"Hello",language:"C"})
//        .done(function(data){
//        alert(data2);
//       // console.log(code);
//        $("#output-container").text("Status:"+  JSON.parse(data).compile_status);
//    })
//        .fail(function(data){
//        // alert("Im here");
//        $("#output-container").text("Failed");
//    }
//    );
//}

function onChangeTabs(identifier) {

    if(identifier == "ansi_c")
        {
//            alert("workng");

            editor.setValue(tracker.ansic);
            editor.getSession().setMode("ace/mode/c_cpp");
        }

    else if(identifier == "cpp_11")
        {
            editor.setValue(tracker.cpp11);
            editor.getSession().setMode("ace/mode/c_cpp");
        }
    else if(identifier == "java__")
        {
            //var paragraph = document.getElementById("java");
            //var text = paragraph.textContent ? paragraph.textContent : paragraph.innerText;
            editor.setValue(tracker.java);
            editor.getSession().setMode("ace/mode/java");
        }
    else if(identifier == "python__")
        {
            editor.setValue(tracker.python);
            editor.getSession().setMode("ace/mode/python");
        }

}


function saveTextAsFile()
{
    var textToSave = editor.getValue();
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = "betaFileName";

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
}

function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}


function swap_values(current_tab,last_tab) {
     //alert("Yaha tk chal rha h iska matlb.");
   // alert("ggggggg");
    identifier = current_tab;
    onChangeTabs(identifier);

}
