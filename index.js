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
  let commitURL = `${githubRoot}/repos/${this.owner.login}/${this.name}/commits`;
  $.get(commitURL, function(data) {
    let commitList = data.map(commit =>
      `<h3>${commit.sha}</h3>` +
      `<p>${commit.author.login} ${commit.commit.author.name} ${author login} </p>`
    ).join('');

    $("#details").html(commitList);
  }).fail(function (error) {
    displayError(error);
  });
}

function displayError(error) {
  let errorDiv = $("#errors");
  errorDiv.html('There was an error:' + error.statusText);
}
