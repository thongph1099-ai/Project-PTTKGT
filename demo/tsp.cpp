#include <fstream>
#include "tsp.h"
void Try(int pos, int count, int sum, int map[4][4], bool visited[MAX], int n, int &res) {
    if (count == n) {
        res = min(res, sum + map[pos][0]); //so sánh với kết quả hiện tại và cập nhật nếu nhỏ hơn
        return;
    }

    // thử tất cả các điểm tiếp theo
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            visited[i] = true;

            Try(i, count + 1, sum + map[pos][i], map, visited, n, res);

            visited[i] = false; // quay lui
        }
    }
}