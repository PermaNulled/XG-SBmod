//
//  packet.js
//  This file is part of XG - XDCC Grabscher
//  http://www.larsformella.de/lang/en/portfolio/programme-software/xg
//
//  Author:
//       Lars Formella <ich@larsformella.de>
//
//  Copyright (c) 2012 Lars Formella
//
//  This program is free software; you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation; either version 2 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program; if not, write to the Free Software
//  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
//

define(['./module'], function (ng) {
	'use strict';

	ng.filter('formatPacketIcon', ['$filter', '$translate', function ($filter, $translate)
	{
		return function (packet)
		{
			if (packet == undefined)
			{
				return "";
			}

			var icon = "file";
			var iconClass = "Aluminium2Middle";
			var overlay = "";
			var overlayClass = "";
			var overlayStyle = "";
			var title = "";

			var name = packet.Name;
			var ext = name.toLowerCase().substr(-3);
			if (ext == "avi" || ext == "wmv" || ext == "mkv" || ext == "mpg" || ext == "mov" || ext == "mp4")
			{
				icon = "film";
			}
			else if (ext == "mp3" || ext == "ogg" || ext == "wav")
			{
				icon = "headphones";
			}
			else if (ext == "rar" || ext == "tar" || ext == "zip")
			{
				icon = "compressed";
			}

			if (!packet.Enabled)
			{
				iconClass = "Aluminium1Dark";
				title = $translate("Download this packet");
			}
			else
			{
				if (packet.Connected)
				{
					iconClass = "SkyBlueDark";
					overlay = "download";
					overlayClass = "SkyBlueMiddle";
					overlayStyle = "opacity: " + $filter('speed2Overlay')(packet.Speed);
					title = $translate("Skip download");
				}
				else if (packet.Next)
				{
					overlay = "time";
					overlayClass = "OrangeMiddle";
					title = $translate("Remove from queue");
				}
				else
				{
					overlay = "time";
					overlayClass = "ButterMiddle";
					title = $translate("Remove from queue");
				}
			}

			if (packet.Active)
			{
				overlay = "asterisk";
				overlayClass = "ScarletRedMiddle animate-spin";
				overlayStyle = "";
			}
			else if (packet.Waiting)
			{
				overlay = "asterisk";
				overlayClass = "ScarletRedLight animate-spin";
				overlayStyle = "";
			}

			return $filter('formatIcon')(icon, iconClass, overlay, overlayClass, overlayStyle, title);
		}
	}]);

	ng.filter('formatPacketName', function ()
	{
		return function (packet)
		{
			if (packet == undefined)
			{
				return "";
			}

			var name = packet.Name;

			if (name == undefined)
			{
				return "";
			}

			var ret = "<span title='" + name + "'>" + name + "</span>";

			if (packet.Connected)
			{
				var a = (packet.CurrentSize / packet.Size).toFixed(2) * 100;
				var b = 100 - a;

				ret += "<div class='progress progress-striped'>" +
					"<div style='width: " + a + "%' class='progress-bar progress-bar-success'></div>" +
					"<div style='width: " + b + "%' class='progress-bar progress-bar-success progress-bar-light'></div>" +
					"</div>";
			}

			return ret;
		}
	});
});
