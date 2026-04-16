#include <bits/stdc++.h>
using namespace std;

struct Node {
    int x, y;
};

extern vector<Node> bfs(Node start, Node end);
extern int rows, cols;
extern vector<vector<int>> grid;

int main() {
    cin >> rows >> cols;

    grid.resize(rows, vector<int>(cols));

    for (int i = 0; i < rows; i++)
        for (int j = 0; j < cols; j++)
            cin >> grid[i][j];

    Node start, end;
    cin >> start.x >> start.y;
    cin >> end.x >> end.y;

    vector<Node> path = bfs(start, end);

    cout << path.size() << endl;
    for (auto &p : path) {
        cout << p.x << " " << p.y << endl;
    }

    return 0;
}