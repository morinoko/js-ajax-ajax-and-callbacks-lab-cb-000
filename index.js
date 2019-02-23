$(document).ready(function (){

});
const githubRoot = "https://api.github.com";

function searchRepositories() {
  let searchTerms = $('#searchTerms').val();
  console.log("Searching Github for", searchTerms);

  let url = `${githubRoot}/users/${searchTerms}/repos`;

  $.get(url, function(data) {
    console.log(data);
    showRepositories(data);
  }).fail(function(error) {
    displayError(error);
  });
}

function showRepositories(data) {
  let repoList = data.map(repo =>
    "<div>" +
    `<h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>` +
    `<p>Description: ${repo.description}</p>` +
    `<a href="https://github.com/${repo.owner.login}" target="_blank"><img src="${repo.owner.avatar_url}" height="32" width="32" /> ${repo.owner.login}</a><br>` +
    '<a href="#" onclick="showCommits()">Show Commits</a>' +
    "</div>"
  ).join('');

  $("#results").html('<ul>' + repoList + '</ul>');
}

function showCommits() {

}

function displayError(error) {
  let errorDiv = $("#errors");
  errorDiv.html('There was an error:' + error.statusText);
}
