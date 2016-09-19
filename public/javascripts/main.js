function alert() {
  alert("div clicked");
}

$('.aComment').click(function() {
  let deleteOrNot = confirm("Delete this comment?");
  if (deleteOrNot) {
    $.ajax({
        url: "/delete-comment/"+$(this).attr('id'),
        type: 'DELETE'
    })
    .then(
      location.reload()
    )
  }
})
$('.deletePostButton').click(function() {
  let deleteOrNot = confirm("Delete this post?");
  if (deleteOrNot) {
    $.ajax({
        url: "/delete-post/"+$(this).attr('id'),
        type: 'DELETE'
    })
    .then(
      window.location.replace('/')
    )
  }
})

// $('.deletePostButton').click(function() {
//   let deletePostOrNot = confirm("Delete this post?");
//   if (deletePostOrNot) {
//     $.ajax({
//         url: "/delete-post/"+$(this).attr('id'),
//         type: 'DELETE'
//     })
//     .then(
//       res.render('index');
//     )
//   }
// })
