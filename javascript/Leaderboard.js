document.addEventListener("DOMContentLoaded", function() {
    const leaderboardTableBody = document.querySelector("#leaderboardTable tbody"); //selects tbody element - used to insert new rows

    //retrieves all users from localStorage and returns an array of users with their scores
    function getAllUsers() {
        let users = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let user = JSON.parse(localStorage.getItem(key));

            if (user && user.username && user.score !== undefined) {
                users.push({ username: user.username, score: user.score }); //username and score pushed into array
            }
        }
        return users;
    }

    function sortUsersByScore(users) {
        return users.sort((a, b) => b.score - a.score);
    }

    function displayLeaderboard() {
        const users = getAllUsers();
        const sortedUsers = sortUsersByScore(users);

        sortedUsers.forEach(user => {   //for each user in the sorted array
            let row = document.createElement("tr");
            let usernameCell = document.createElement("td");
            let scoreCell = document.createElement("td");

            usernameCell.textContent = user.username;
            scoreCell.textContent = user.score;

            row.appendChild(usernameCell);
            row.appendChild(scoreCell);
            leaderboardTableBody.appendChild(row);
        });
    }

    displayLeaderboard();
});
