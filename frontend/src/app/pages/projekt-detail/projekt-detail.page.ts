import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api, Project, DurchschnittEintrag } from '../../services/api';

@Component({
  selector: 'app-projekt-detail',
  templateUrl: './projekt-detail.page.html',
  styleUrls: ['./projekt-detail.page.scss'],
  standalone: false,
})
export class ProjektDetailPage implements OnInit {
  projekt = signal<Project | undefined>(undefined);
  bewertungen = signal<DurchschnittEintrag[]>([]);

  constructor(private route: ActivatedRoute, private api: Api) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getProject(id).subscribe(data => this.projekt.set(data));
    this.api.getDurchschnitt(id).subscribe(data => this.bewertungen.set(data));
  }
}
