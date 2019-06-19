#include<stdio.h>
#include<stdlib.h>
#include<string.h>

void runAlgo(char*);

int main(int argc, char** argv){
    if(argc != 2){
        printf("Invalid arguement length. Expeted: 2. Recieved: %d. \n",argc);
    }
    else{
        runAlgo(argv[1]);
    }
    return 0;
}

void runAlgo(char* input){
    printf("%d", atoi(input));
}
