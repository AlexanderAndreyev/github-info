import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../../services';

export interface PeriodicElement {
  name: string;
  position: number;
  total_commits?: number;
  repository?: any;
}

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'total_commits'];
  dataSource: PeriodicElement[];

  constructor(protected profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.profileService.getUserRepositories$().subscribe((repositories) => {
      this.buildTableData(repositories);
    });
  }

  private buildTableData(repositories: any): void {
    this.dataSource = repositories.reduce((currentList, repository, index) => {
      return [
        ...currentList,
        {
          position: index + 1,
          name: repository.name,
          repository
        }
      ];
    }, []);
  }
}
