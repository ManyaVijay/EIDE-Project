import { Component, OnInit } from '@angular/core';
import { JsonMonitorService } from './json-monitor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  monitorData: any[] = [];
  query: any;
  data: any[] = [];
  filteredData: any[] = [];
  searchTerm: string = '';
  searchText: string ='';
  fileNames: any;
  isToggled: boolean = false;
  selectedIndices: number[] = [];
  sortedEDIDs: any[] = [];
  sortOrder: { [key: string]: string } = {};

  constructor(private jsonMonitorService: JsonMonitorService) { }

  ngOnInit(): void {
    const fileNames: any[]= [
      "BenQ SC3211",
      "Dell ZT60",
      "Haier LE39B50",
      "LG 50LA621Y",
      "Mag RD24L",
      "Normande ND3276",
      "Panasonic TH-L32B6",
      "Philips 55PFL6008",
      "Philips 226V4LSB",
      "Samsung UA46F6400",
      "Samsung UA55F6400",
      "Sharp LC50LE450M",
      "Sony KDL50W656",
    ];

    this.jsonMonitorService.getMonitorData(fileNames).subscribe(data => {
      //this.monitorData = data;
      this.filteredData = data; 
      //this.monitorData = [...this.data];
      
      console.log('Monitor Data:', this.monitorData);
    });

    this.sortedEDIDs = [...this.filteredData];
}


search() {
  this.filteredData = this.filteredData.filter((filteredData) =>
  filteredData.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
 
}


toggle(index: number): void {
  const selectedIndex = this.selectedIndices.indexOf(index);
  if (selectedIndex === -1) {
    this.selectedIndices.push(index);
  } else {
    this.selectedIndices.splice(selectedIndex, 1);
  }
}

isSelected(index: number): boolean {
  return this.selectedIndices.includes(index);
}

sort(field: string): void {
  if (!this.sortOrder[field] || this.sortOrder[field] === 'desc') {
    this.sortedEDIDs.sort((a, b) => (a[field] > b[field] ? 1 : -1));
    this.sortOrder[field] = 'asc';
  } else {
    this.sortedEDIDs.sort((a, b) => (a[field] < b[field] ? 1 : -1));
    this.sortOrder[field] = 'desc';
  }
}


}
