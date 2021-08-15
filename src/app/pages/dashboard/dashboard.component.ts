import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApexAxisChartSeries, ApexChart, ApexNonAxisChartSeries, ApexResponsive, ApexXAxis, ChartComponent } from "ng-apexcharts";
import { DashboardService } from "src/app/services/dashboard.service";
import { MessagingService } from "src/app/services/firebase.service";
import { TeamService } from "src/app/services/team.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;  
  xaxis: ApexXAxis;
  seriesnon: ApexAxisChartSeries;
  colors: string[];
};
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  message:any;
  notif;
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  tresor=[]
  mostbet=[]
  bet=0
  stat=[]
  parmois=[]
  year;
  public statistique=[]
  public chartOptions: Partial<ChartOptions> 
  public chartOptions2: Partial<ChartOptions> 
  public chartOptions3: Partial<ChartOptions> 
  constructor( private snackbar:MatSnackBar,private messagingService: MessagingService,private dashboardService:DashboardService,private teamService:TeamService) { 
    this.dashboardService.paristat().subscribe(data => {
      if(data){
        this.getstat(data);}
    });   
  }
  ngOnInit() {
    this.dashboard();
    this.readmsg();
  }

  public dashboard() {
    this.dashboardService.getTresorerie().subscribe(data => {
     this.tresor = data
    });
     this.dashboardService.matchsMostBet().subscribe(data => {
      this.mostbet = data
      this.matchstat()
     });
    this.initparisparmois(2021);
  }
  initparisparmois(year){ 
    this.bet=0
    this.year=year;
    this.dashboardService.pariparmois(year).subscribe(data => {
      this.parmois=data
      data.forEach(element => {
        console.log(element[1])
        this.bet=this.bet+element[1]
      });
      this.parm(data)
      console.log(this.parmois);
    });
  }
  readmsg(){
    this.messagingService.requestPermission()
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
    if(this.message.value!=null){
      this.notif=this.message.value.notification.body
      this.snackbar.open(this.message.value.notification.title+" "+this.notif, "ok");
      console.log(this.message.value.notification.body)
    }
  }
  msg(){
    this.messagingService.postmsg().subscribe(data => {
      //console.log(data);
    });
  }
  async parm(parmois){
    let valeur=[null,null,null,null,null,null,null,null,null,null,null,null]
    for await(let parm of parmois ) { 
       switch(parm[0]){
        case "01": valeur[0]=parm[1]
        break 
        case "02": valeur[1]=parm[1]
        break
        case "03": valeur[2]=parm[1]
        break 
        case "04": valeur[3]=parm[1]
        break
        case "05": valeur[4]=parm[1]
        break 
        case "06": valeur[5]=parm[1]
        break
        case "07": valeur[6]=parm[1]
        break 
        case "08": valeur[7]=parm[1]
        break
        case "09": valeur[8]=parm[1]
        break 
        case "10": valeur[9]=parm[1]
        break
        case "11": valeur[10]=parm[1]
        break
        case "12": valeur[11]=parm[1]
        break
       } 
     };
     this.chartOptions3 = {
      colors: ['#F44336', '#9E9595','#F44336','#9E9595'],
      seriesnon:  [
        {
          name: "Nombre paris",
          data: valeur
        }
      ],
      chart: {
        height: 350,
        type: "line",
      },  
      
      xaxis: {
        categories: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","decembre"]
      }
    };
  }
  async matchstat(){
        
    let labelmatch=[]
    let labelmatch1=[]
    this.mostbet.forEach(element => {
      labelmatch.push(element.match[0].team_1[0].name+" vs "+element.match[0].team_2[0].name)
      labelmatch1.push(element.count)
    });
    this.chartOptions2 = {
      colors: ['#673AB7', '#9E9595','#F44336','#9E9595'],
      seriesnon:  [
        {
          name: "Nombre paris",
          data: labelmatch1
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        
      },  
      xaxis: {
        categories: labelmatch
      }
    };
  }
  async getstat(stat){
    let team
    let label=[]
    let label1=[]
    let lab=[4,4]
    for await(let stats of stat ) {    
      //const data = await this.teamService.getTeamById(stats.team).toPromise();
      //team = data;
      if(stats.team_detail[0]){
        this.statistique.push({count:stats.count,name:stats.team_detail[0].name})
        label.push(stats.team_detail[0].name)
        label1.push(stats.count)
      }
    }
    this.chartOptions = {
      colors: ['#F44336', '#9E9595','#673AB7','#9E9595'],
      series:  label1,
      chart: {
        width: 380,
        type: "donut",
        
      },
      labels: label,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

  }
  filtre(year){
    console.log(year);
    this.initparisparmois(year);
  }
}
