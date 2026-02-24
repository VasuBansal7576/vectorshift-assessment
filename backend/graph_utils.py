from collections import deque


def is_dag_kahn(nodes, edges):
    node_ids = {
        node.get("id")
        for node in nodes
        if isinstance(node, dict) and node.get("id") is not None
    }

    adjacency = {node_id: [] for node_id in node_ids}
    indegree = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        if not isinstance(edge, dict):
            continue

        source = edge.get("source")
        target = edge.get("target")

        if source is None or target is None:
            continue

        if source not in adjacency:
            adjacency[source] = []
            indegree[source] = 0
        if target not in adjacency:
            adjacency[target] = []
            indegree[target] = 0

        adjacency[source].append(target)
        indegree[target] += 1

    queue = deque([node_id for node_id, degree in indegree.items() if degree == 0])
    visited_count = 0

    while queue:
        current = queue.popleft()
        visited_count += 1

        for neighbor in adjacency[current]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited_count == len(indegree)
