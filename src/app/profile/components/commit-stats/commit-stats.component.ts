import { Component, Input } from '@angular/core';

import { ProfileService } from '../../services';

@Component({
  selector: 'app-commit-stats',
  templateUrl: 'commit-stats.component.html',
  styleUrls: ['commit-stats.component.scss']
})
export class CommitStatsComponent {

  loading = false;

  @Input() username: string;
  @Input() repository: string;

  protected totalCommits: number | string;

  constructor(private profileService: ProfileService) {}

  onLoadTotalCommits(): void {
    this.loading = true;
    this.profileService.getRepositoryStats$(this.username, this.repository).subscribe((commitStats: any) => {
      this.handlerUserCommits(commitStats);
      this.loading = false;
    });
  }

  private handlerUserCommits(commitStats: any) {
    if (commitStats && Array.isArray(commitStats)) {
      const userCommitStats: any = this.findUserCommitStats(commitStats);
      this.setTotalCommitData(userCommitStats);
    } else {
      this.totalCommits = 'No data';
    }
  }

  private setTotalCommitData(totalCommit: any): void {
    if (totalCommit && totalCommit.total) {
      this.totalCommits = totalCommit.total;
    } else {
      this.totalCommits = 'No data';
    }
  }

  private findUserCommitStats(commitStats: any[]): any {
    return commitStats.find((statData: any) => {
      return statData.author.login === this.username;
    });
  }
}
