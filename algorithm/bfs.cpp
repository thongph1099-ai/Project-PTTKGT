#include <bits/stdc++.h>
using namespace std;

int rows, cols;
vector<vector<int>> grid;

struct Node {
    int x, y;
};

vector<Node> bfs(Node start, Node end) {
    vector<vector<bool>> visited(rows, vector<bool>(cols, false));
    vector<vector<Node>> parent(rows, vector<Node>(cols, {-1, -1}));

    queue<Node> q;
    q.push(start);
    visited[start.x][start.y] = true;

    int dx[] = {1, -1, 0, 0};
    int dy[] = {0, 0, 1, -1};

    while (!q.empty()) {
        Node cur = q.front(); q.pop();

        if (cur.x == end.x && cur.y == end.y) break;

        for (int i = 0; i < 4; i++) {
            int nx = cur.x + dx[i];
            int ny = cur.y + dy[i];

            if (nx >= 0 && ny >= 0 && nx < rows && ny < cols &&
                !visited[nx][ny] && grid[nx][ny] == 0) {

                visited[nx][ny] = true;
                parent[nx][ny] = cur;
                q.push({nx, ny});
            }
        }
    }

    // dựng đường đi
    vector<Node> path;
    Node cur = end;

    while (!(cur.x == -1)) {
        path.push_back(cur);
        Node p = parent[cur.x][cur.y];
        cur = p;
    }

    reverse(path.begin(), path.end());
    return path;
}