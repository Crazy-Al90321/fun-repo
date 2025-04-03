import numpy as np

def lcs_table(word1, word2):
    # Create a DP table to compute LCS
    m, n = len(word1), len(word2)
    table = np.zeros((m+1, n+1), dtype=int)

    # Fill the DP table
    for i in range(1, m+1):
        for j in range(1, n+1):
            if word1[i-1] == word2[j-1]:
                table[i][j] = table[i-1][j-1] + 1
            else:
                table[i][j] = max(table[i-1][j], table[i][j-1])

    similarity = table[m][n]
    return table.tolist(), similarity

def get_autocomplete_suggestions(prefix, dictionary):
    suggestions = [word for word in dictionary if word.startswith(prefix)]
    return suggestions
