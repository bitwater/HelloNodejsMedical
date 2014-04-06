var allDoctor = {};
$('#query').on('click', function (event) {
    qryAllDoctor();
});

var qryAllDoctor = function () {
    var name = $('#input_query').val();

    $.ajax({
        type: "get",
        url: '/doctor/query/' + name,
        success: function (data, textStatus) {
            if (data) {
//                alert('success');
                allDoctor = data;
                showDoctorTable();
//                    $(location).attr('href','/doctor/'+allDoctor.name);
            } else {
                alert('对不起,没有相关用户!');
            }
        }
    })
}

$("a[href]").click(function(){
//    var id = $(this).parents("tr").children("td:nth-child(1)").text();
//    alert("hello");
})

var showDoctorTable = function () {
    $('#tbody tr').remove();
    var id;
    var name;
    var prof_title;
    var city;
    var telnumber;
    for (var i = 0; i < allDoctor.length; i++) {
        id = allDoctor[i]._id;
        name = allDoctor[i].name;
        prof_title = allDoctor[i].prof_title;
        city = allDoctor[i].city;
        telnumber = allDoctor[i].telnumber;
        $('#tbody').append("<tr> <td>" + name + "</td> <td>" + prof_title +
            "</td> <td>" + city + "</td> <td>" + telnumber +
            "</td> <td> <a class='btn btn-link' href='/doctor/show/" + id +"'>详细</a>" +
            "<a class='btn btn-link' href='/doctor/add/" + id +"'>编辑</a>" +
            "<a class='btn btn-link' href='/doctor/delete/" + id +"'>删除</a> </td> </tr>")
    }
}
