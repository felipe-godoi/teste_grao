import { Component, input } from "@angular/core";
import { MenuItem } from "../../../../shared/interfaces/restaurants.type";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: "app-detail-card",
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: "./detail-card.component.html",
  styleUrl: "./detail-card.component.scss",
})
export class DetailCardComponent {
  menuItem = input.required<MenuItem>();
}
