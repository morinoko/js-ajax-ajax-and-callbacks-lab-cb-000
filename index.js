function searchRepositories() {
  // Clear errors, if any
  $("#errors").html("");

  // Get search term from input and create API search url
  const searchTerms = $('#searchTerms').val();
  const url = `https://api.github.com/search/repositories?q=${searchTerms}`;

  console.log("Searching Github for", searchTerms);

  // Get data from Github's API. Display error if error occurs
  $.get(url, function(data) {
    console.log(data);
    showRepositories(data);
  }).fail(function(error) {
    displayError(error);
  });
}

function showRepositories(data) {
  let repoList = data.items.map(repo =>
    "<div>" +
    `<h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>` +
    `<p>Description: ${repo.description}</p>` +
    `<a href="https://github.com/${repo.owner.login}" target="_blank"><img src="${repo.owner.avatar_url}" height="32" width="32" /> ${repo.owner.login}</a><br>` +
    `<a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a>` +
    "</div>"
  ).join('');

  $("#results").html('<ul>' + repoList + '</ul>');
}

function showCommits(repoElement) {
  const username = repoElement.dataset.owner;
  const repo = repoElement.dataset.repository
  const commitURL = `https://api.github.com/repos/${username}/${repo}/commits`;

  $.get(commitURL, function(data) {
    let commitList = data.map(commit =>
      `<h3>${commit.commit.message}</h3>` +
      `<p>SHA: ${commit.sha}</p>` +
      `<p><img src="${commit.author.avatar_url}" height="32" width="32" /> ${commit.author.login} ${commit.commit.author.name}</p>`
    ).join('');

    $("#details").html(commitList);
  }).fail(function (error) {
    displayError(error);
  });
}

function displayError() {
  let errorDiv = $("#errors");
  errorDiv.html("I'm sorry, there's been an error. Please try again.");
}

$(document).ready(function (){

});
