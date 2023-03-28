s1 = "CAA__GC_AA"
s2 = "GGT__C__CC"

p = 1
n = -2
g = -3

matrix = []

height = 0
width = 0

def Smith_Waterman():
    #						Smith_Waterman method
    
    #						Making the blank matrix
    for x in range(height+2):
        matrix.append([])
        for y in range(width+2):
            matrix[x].append('')# will be set to null after testing
        
    #						Giving it starter values
    matrix[1][1] = 0
    matrix[1][2] = 0
    matrix[2][1] = 0
    #						Making the first collumn and line
    for x in range(height+2):
        if x>1:
            matrix[x][1] = 0
            matrix[x][0] = s2[x-2]
    for y in range(width+2):
        if y>1:
            matrix[1][y] = 0
            matrix[0][y] = s1[y-2]
            
    #						Calculating the matrix
    i = 1
    j = 1
    for x in range(height+2):
        for y in range(width+2):
            if x>1 and y>1:
                maxi = 0
    #						Getting into the main part
    #						Diagonal line
                if x==y:
                    matrix[x][y]=matrix[x-1][y-1] + png_test(x,y)
    #						The rest
                else:
                    maxi=max([matrix[x-1][y],matrix[x][y-1],matrix[x-1][y-1]])
                    matrix[x][y]=maxi + png_test(x,y)
                    
                if matrix[x][y]<0:
                    matrix[x][y]=0
    for x in range(height+2):
        for y in range(width+2):
            if x>1 and y>1:
                if matrix[x][y]>matrix[i][j]:
                    i = x
                    j = y
    seq1 = str(matrix[i][0])
    seq2 = str(matrix[0][j])
    #backtrack(i,j)

def show_matrix():
    for x in range(height+2):
        print('\n')
        for y in range(width+2):
            print(matrix[x][y],end=' ')

def dl_dh():
    #						Shows the 'score' of the matrix
    line_min = min(height,width)
    line_max = max(height,width)
    dh = 0
    dl = 0
    nn = 0
    for x in range(line_min):
        if s1[x-1]==s2[x-1]:
            dh += 1
        else:
            nn += 1
    dl = dh*p + nn*n + (line_max-line_min)*g	
    print("\nDH = ",dh)
    print("DL = ",dl)

def png_test(x,y):
    x=x-2
    y=y-2
    
    if s1[y]==s2[x]:
        return p
    elif x==y:
        return n
    else:
        return g
        
def backtrack(x,y):
    seq_max = max(width,height)
    seq1 = ""
    seq2 = ""
    
    while seq_max>0:
        a = int(matrix[x-1][y])
        b = int(matrix[x][y-1])
        c = int(matrix[x-1][y-1])
        highest = max(a,b,c)
        print(a,b,c)
        print("Highest is:",highest)

        if highest == c:
            seq1 = str(matrix[0][y-1]) + seq1
            seq2 = str(matrix[x-1][0]) + seq2
            x=x-1
            y=y-1
        elif highest == a:
            seq1 = " " + seq1
            seq2 = str(matrix[x-1][0]) + seq2
            x=x-1
        elif highest == b:
            seq1 = str(matrix[0][y-1]) + seq1
            seq2 = " " + seq2
            y=y-1
        seq_max -= 1

    seq1 = seq1 + str(matrix[0][height+1])
    seq2 = seq2 + str(matrix[width][0])

    print(seq1)
    print(seq2)
    #						Initialising the basic vars
if s1 and s2:
    width = len(s1)
    height = len(s2)
    #						Erases any previous values
    #						matrix = []
    #						Starts processes
Smith_Waterman()
show_matrix()
dl_dh()
