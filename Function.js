var Imgs, Start;
var n, nB, Wc;
var Wd, Hg;
var Mark, NmbO, Help;
var Wins, WinC;
var Stats, End;

function Timer() {
    var i, Anmtn;

    Imgs = [];
    Imgs[1] = "Jejeling.gif";
    Imgs[2] = "Magmaring.gif";
    Imgs[3] = "Pouring.gif";
    Imgs[4] = "Metaling.gif";

    Anmtn = document.getElementById("Anmt");
    for (i = 1; i <= 4; i++)
        Anmtn.innerHTML = Anmtn.innerHTML + "<td width=39 height=33 id=Img" + i + "> <img src=" + Imgs[i] + " /> </td>";
    Start = setInterval(Timee, 1500);
}

function Timee() {
    var i, temp;

    temp = Imgs[1];
    for (i = 1; i < 4; i++)
        Imgs[i] = Imgs[i + 1];
    Imgs[4] = temp;

    for (i = 1; i <= 4; i++)
        document.getElementById("Img" + i).innerHTML = "<img src =" + Imgs[i] + " />";
}

function OO() {
    document.getElementById("Opts").style = "background-color:LightBlue";
    document.getElementById("Optt").innerHTML = "O";
    if (End != 1)
        document.getElementById("Msg").innerHTML = "";
    Stats = 1;
}

function XX() {
    document.getElementById("Opts").style = "background-color:Violet";
    document.getElementById("Optt").innerHTML = "X";
    if (End != 1)
        document.getElementById("Msg").innerHTML = "";
    Stats = 2;
}

function HintA() {
    document.getElementById("Opts").style = "background-color:Green";
    document.getElementById("Optt").innerHTML = "HintA";
    if (End != 1)
        document.getElementById("Msg").innerHTML = "";
    Stats = 3;
}

function Sbmt() {
    var Rslt;

    End = 0;
    Stats = 0;
    Wins = 0;
    WinC = 0;

    Wd = Number(document.getElementById("Wdth").value);
    Hg = Number(document.getElementById("Hght").value);
    Rslt = Wd + Hg;

    if (Wd < 3 || Wd > 26 || Hg < 3 || Hg > 26 || isNaN(Rslt)) {
        document.getElementById("Opt").innerHTML = "Your input is wrong! (Min input = 3, Max input = 26)";
        document.getElementById("Tbl").innerHTML = "";
    } else {
        n = Math.floor(Rslt / 6);
        nB = 0;
        if (n > 4)
            nB = n - 4;
        Wc = n - 1;

        PrintSt();
        PrintTab();
    }
}

function HintB() {
    var i, j, Cnt, Cell, Cntr, Unmarked;
    var bol = false;

    if (End != 1) {
        document.getElementById("Msg").innerHTML = "";

        if (nB == 0)
            document.getElementById("Msg").innerHTML = "You cannot use HintB anymore!";
        else {
            nB = nB - 1;
            Cnt = 0;

            while (bol == false) {
                Unmarked = []
                Cell = 0;
                Cntr = 0;

                for (i = 1; i <= Hg; i++)
                    for (j = 1; j <= Wd; j++) {
                        Cell = Cell + 1;
                        if (Mark[i][j] == 0) {
                            Cntr = Cntr + 1;
                            Unmarked[Cntr] = Cell
                        }
                    }

                var Rand = Math.floor(Math.random() * Cntr) + 1;
                Cell = Unmarked[Rand]

                i = Math.floor(Cell / Wd) + 1
                j = Cell % Wd
                if (j == 0) {
                    i = i - 1
                    j = Wd
                }

                Cnt = Cnt + 1;
                Mark[i][j] = 2;
                var TCell = document.getElementById("Tds" + Cell);
                TCell.style = "background-color:Purple";
                var Imge = document.getElementById("XorO" + Cell);
                if (NmbO[i][j] == 1)
                    Imge.src = "Magmaring.gif";
                else {
                    if (Help[i][j] == 0)
                        Imge.src = "Pouring.gif";
                    else
                        TCell.innerHTML = "<b> <font size = 3>" + Help[i][j] + "</font> </b>";
                    WinC = WinC + 1;
                    if (WinC == Wins)
                        Winn();
                }

                if (Cnt == Cntr || Cnt == 2)
                    bol = true;
            }
        }
        document.getElementById("HintB").innerHTML = nB;
    }
}

function PrintSt() {
    var Opt;

    Opt = document.getElementById("Opt");
    Opt.innerHTML = "<br /><table width=150 border=1 style=background-color:Gray>" +
        "<tr style=background-color:Black><td colspan=2 align=center><b><font color=White>Status : </td></tr>" +
        "<tr><td rowspan=3 colspan=2> <table width=100% style=background-color:Black>" +
        "<tr><td><font color=Orange><b>Wrong Chance(s)</td> <td><font color=Orange><b id=WrgCh>" + Wc + "</td></tr>" +
        "<tr><td><font color=Green><b>HintA</td> <td><font color=Green><b id=HntA>" + n + "</td></tr>" +
        "<tr><td><font color=Purple><b>HintB</td> <td><font color=Purple><b id=HintB>" + nB + "</td></tr>" +
        "</table> </td></tr></table><br/ > " +

        "<img src=Pouring.gif /> <b>: <font color=LightBlue>O</font> <img src=Metaling.gif /> : <font color=Violet>X<br />" +

        "<table width=135 border=1 style=background-color:black>" +
        "<tr><td id=Opts align=center style=background-color:gray><b><font id=Optt color=black>NONE</td></tr></table>" +
        "<button id=OO onclick=OO()><font color=LightBlue><b>O</button> <button id=XX onclick=XX()><font color=Violet><b>X</button>" +
        " <button id=HintA onclick=HintA()><font color=Green><b>HintA</button>";

    if (nB > 0)
        Opt.innerHTML = Opt.innerHTML + "<br /><button id=HintB onclick=HintB()><font color=purple><b>Use HintB</button>";

    Opt.innerHTML = Opt.innerHTML + "<div> <b id=Msg> </b> </div> <br />";
}

function PrintTab() {
    var Tab, i, j, k, Cell, Check;

    Check = 0;
    Tab = document.getElementById("Tbl");
    Tab.innerHTML = "<table><tr><td valign=top><table id=Nmbr></table></td> <td><table id=Alfa></table></td></tr></table>";
    Tab = document.getElementById("Alfa");

    Tab.innerHTML = "<tr><td align=left> <table><tr id=Row></tr></table> </td></tr>";
    Tab = document.getElementById("Row");
    Tab.innerHTML = Tab.innerHTML + "<td align=center width=2></td>";

    for (i = 1; i <= Wd; i++)
        Tab.innerHTML = Tab.innerHTML + "<td align=center width=41> <b>&#" + (i + 64) + "</td>";
    Tab.innerHTML = Tab.innerHTML + "<td><br /></td>";

    Tab = document.getElementById("Alfa");
    Tab.innerHTML = Tab.innerHTML + "<tr><td colspan=" + (Wd + 1) + " rowspan=" + (Hg + 1) + " align=left id=Tabs></td></tr>";

    Tab = document.getElementById("Nmbr");
    Tab.innerHTML = Tab.innerHTML + "<tr> <td height=25><br /></td> </tr>";
    for (i = 1; i <= Hg; i++)
        Tab.innerHTML = Tab.innerHTML + "<tr> <td valign=middle align=center height=38><b>" + i + "</td></tr>";

    Tab = document.getElementById("Tabs");
    Tab.innerHTML = "<table id=Tbls border=1 style=background-color:Brown></table>";

    NmbO = [];
    for (k = 1; k <= Hg; k++)
        NmbO[k] = [];

    Mark = [];
    for (k = 1; k <= Hg; k++)
        Mark[k] = [];

    Help = [];
    for (k = 1; k <= Hg; k++)
        Help[k] = [];

    Tab = document.getElementById("Tbls");

    do {
        Tab.innerHTML = "";
        Cell = 0;
        Wins = 0;
        for (i = 1; i <= Hg; i++) {
            Tab.innerHTML = Tab.innerHTML + "<tr id=Trs" + i + " style=background-color:Pink>";
            Tab = document.getElementById("Trs" + i);
            for (j = 1; j <= Wd; j++) {
                NmbO[i][j] = Math.floor(Math.random() * 2);
                if (NmbO[i][j] == 1)
                    NmbO[i][j] = Math.floor(Math.random() * 2);

                if (NmbO[i][j] == 1)
                    NmbO[i][j] = Math.floor(Math.random() * 2);

                if (NmbO[i][j] == 1) {
                    if (Check == 0)
                        Check = -1;
                    else if (Check == -2)
                        Check = 1;
                }

                if (NmbO[i][j] == 0) {
                    Wins = Wins + 1;
                    if (Check == 0)
                        Check = -2;
                    else if (Check == -1)
                        Check = 1;
                }

                Mark[i][j] = 0;
                Help[i][j] = 0;
                Cell = Cell + 1;
                Tab.innerHTML = Tab.innerHTML + "<td width=39 height=33 id=Tds" + Cell + " onclick=Choose(" + Cell + ") align=center> <img id=XorO" + Cell + " src = Jejeling.gif /> </td>";
            }
            Tab.innerHTML = Tab.innerHTML + "</tr>";
            Tab = document.getElementById("Tbls");
        }
    } while (Check <= 0);

    for (i = 1; i <= Hg; i++) {
        for (j = 1; j <= Wd; j++) {
            if (NmbO[i][j] == 0) {
                if (i > 1 && j > 1 && NmbO[i - 1][j - 1] == 1)
                    Help[i][j] = Help[i][j] + 1;
                if (i > 1 && NmbO[i - 1][j] == 1)
                    Help[i][j] = Help[i][j] + 1;
                if (i > 1 && j < Wd && NmbO[i - 1][j + 1] == 1)
                    Help[i][j] = Help[i][j] + 1;
                if (j > 1 && NmbO[i][j - 1] == 1)
                    Help[i][j] = Help[i][j] + 1;
                if (j < Wd && NmbO[i][j + 1] == 1)
                    Help[i][j] = Help[i][j] + 1;
                if (i < Hg && j > 1 && NmbO[i + 1][j - 1] == 1)
                    Help[i][j] = Help[i][j] + 1;
                if (i < Hg && NmbO[i + 1][j] == 1)
                    Help[i][j] = Help[i][j] + 1;
                if (i < Hg && j < Wd && NmbO[i + 1][j + 1] == 1)
                    Help[i][j] = Help[i][j] + 1;
            }
        }
    }
}

function Pouring(x, y) {
    var Cell = (x - 1) * Wd + y;
    var TCell = document.getElementById("Tds" + Cell);
    TCell.style = "background-color:LightBlue";
    Mark[x][y] = 2;
    if (Help[x][y] == 0) {
        document.getElementById("XorO" + Cell).src = "Pouring.gif";
        if (x > 1 && Mark[x - 1][y] == 0)
            Pouring(x - 1, y);
        if (x < Hg && Mark[x + 1][y] == 0)
            Pouring(x + 1, y);
        if (y > 1 && Mark[x][y - 1] == 0)
            Pouring(x, y - 1);
        if (y < Wd && Mark[x][y + 1] == 0)
            Pouring(x, y + 1);
    } else {
        TCell.innerHTML = "<b> <font size = 3>" + Help[x][y] + "</font> </b>";
    }
    WinC = WinC + 1;
    if (WinC == Wins)
        Winn();
}

function Choose(Cell) {
    var x, y;

    x = Math.floor(Cell / Wd);
    y = Cell - x * Wd;
    if (y == 0)
        y = Wd;
    else
        x = x + 1;

    var Imge = document.getElementById("XorO" + Cell);
    var TCell = document.getElementById("Tds" + Cell);

    if (Stats != 0 && Mark[x][y] == 0 && (Stats != 3 || n > 0)) {
        document.getElementById("Msg").innerHTML = "";
        if (Stats == 2 && Mark[x][y] == 0) {
            Imge.src = "Metaling.gif";
            Mark[x][y] = 1;
            TCell.style = "background-color:Violet";
        }

        if (Stats == 1 || Stats == 3) {
            if (Help[x][y] == 0)
                if (NmbO[x][y] == 0)
                    Pouring(x, y);
                else
                    Imge.src = "Magmaring.gif";
            else if (Help[x][y] != 0)
                TCell.innerHTML = "<b> <font size = 3>" + Help[x][y] + "</font> </b>";
            Mark[x][y] = 2;
        }

        if (Stats == NmbO[x][y]) {
            if (Wc > 0)
                Wc = Wc - 1;
            else
                Lose();
            document.getElementById("WrgCh").innerHTML = Wc;
        }

        if (Stats == 3) {
            TCell.style = "background-color:Green";
            n = n - 1;
            document.getElementById("HntA").innerHTML = n;
        } else if (Stats == 1)
            if (NmbO[x][y] == 0)
                TCell.style = "background-color:LightBlue";
            else
                TCell.style = "background-color:Orange";

        if (Stats != 2 && Help[x][y] != 0) {
            WinC = WinC + 1;
            if (WinC == Wins)
                Winn();
        }
    } else if (Stats == 2 && Mark[x][y] == 1) {
        Imge.src = "Jejeling.gif";
        Mark[x][y] = 0;
        TCell.style = "background-color:Pink";
    } else if (Stats != 0 && Mark[x][y] == 0)
        document.getElementById("Msg").innerHTML = "You cannot use HintA anymore!";
}

function Winn() {
    var i, j, Cell;

    Cell = 0;
    for (i = 1; i <= Hg; i++)
        for (j = 1; j <= Wd; j++) {
            Cell = Cell + 1;
            if (Mark[i][j] < 2) {
                var Imge = document.getElementById("XorO" + Cell);
                var TCell = document.getElementById("Tds" + Cell);
                Imge.src = "Magmaring.gif";
                if (Mark[i][j] == 0)
                    TCell.style = "background-color:Red";
                Mark[i][j] = 2;
            }
        }

    End = 1;
    document.getElementById("Msg").innerHTML = "<font size=5 color=Turquoise>You Win!!!";
}

function Lose() {
    var i, j, Cell;

    Cell = 0;
    for (i = 1; i <= Hg; i++)
        for (j = 1; j <= Wd; j++) {
            Cell = Cell + 1;
            if (Mark[i][j] < 2) {
                var Imge = document.getElementById("XorO" + Cell);
                var TCell = document.getElementById("Tds" + Cell);
                if (NmbO[i][j] == 0) {
                    if (Mark[i][j] == 0)
                        TCell.style = "background-color:Pink";
                    if (Help[i][j] == 0)
                        Imge.src = "Pouring.gif";
                    else
                        TCell.innerHTML = "<b> <font size = 3>" + Help[i][j] + "</font> </b>";
                } else {
                    Imge.src = "Magmaring.gif";
                    if (Mark[i][j] == 0)
                        TCell.style = "background-color:Red";
                }
                Mark[i][j] = 2;
            }
        }

    End = 1;
    document.getElementById("Msg").innerHTML = "<font size=5 color=Red>You Lose!!!";
}
