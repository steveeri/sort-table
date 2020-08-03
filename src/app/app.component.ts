import { Component, QueryList, ViewChildren, OnInit, OnDestroy } from '@angular/core';
import { Country, NgbdSortableHeader, SortEvent, compare } from './table-sortable-directive';
import { BehaviorSubject } from 'rxjs';

const COUNTRIES: Country[] = [
  {
    id: 1,
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    date: "12 Dec 2017",
    population: 146989754
  },
  {
    id: 2,
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    date: "03 Apr 2018",
    population: 36624199
  },
  {
    id: 3,
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    date: "21 Jan 2002",
    population: 324459463
  },
  {
    id: 4,
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    date: "11 Jun 2009",
    population: 1409517397
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void { }

  title = 'sort-table';
  countries = new BehaviorSubject<Country[]>([]);

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  ngOnInit() {
    this.countries.next([...COUNTRIES]);
  }

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) { header.direction = ''; }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.countries.next([...COUNTRIES]);
    } else {
      this.countries.next(
        [...COUNTRIES].sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        })
      );
    }
  }

}
