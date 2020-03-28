[1mdiff --git a/app/javascript/components/BoggleComponent/ScoreListComponent/score-list.js b/app/javascript/components/BoggleComponent/ScoreListComponent/score-list.js[m
[1mindex a4dbdb0..0c93b40 100644[m
[1m--- a/app/javascript/components/BoggleComponent/ScoreListComponent/score-list.js[m
[1m+++ b/app/javascript/components/BoggleComponent/ScoreListComponent/score-list.js[m
[36m@@ -14,28 +14,6 @@[m [mexport default class ScoreList extends React.Component{[m
     }[m
 [m
     [m
[31m-   [m
[31m-   [m
[31m-    // updateScore(word){[m
[31m-        [m
[31m-        [m
[31m-    //     console.log('called');[m
[31m-    //     console.log(this.state.score);[m
[31m-    //     var points = word.length;[m
[31m-    //     var word_list = this.state.words_list;[m
[31m-    //     word_list.push(word);[m
[31m-    //     this.setState({[m
[31m-    //         score : score+points,[m
[31m-    //         words_list: word_list[m
[31m-    //     },()=>{[m
[31m-    //         console.log(this.state.score);[m
[31m-    //     });[m
[31m-        [m
[31m-[m
[31m-       [m
[31m-    //     // return true;[m
[31m-    // }[m
[31m-[m
     render(){[m
         var points = this.props.value.length;[m
         console.log(JSON.stringify(word_array));[m
