#!/usr/bin/env python
#-*- coding:utf-8 -*-

import csv
import json
import requests
import sys

def main():
    with open('septa-stops.csv') as csvfile:
        reader = csv.reader(csvfile)

        first_row_skipped = False
        for row in reader:

            # Skip the first row
            if not first_row_skipped:
                first_row_skipped = True
                continue

            place = {
                'submitter_name': u'The Bicycle Coalition',
                'location': {
                  'lat': float(row[3]),
                  'lng': float(row[4])
                },
                'name': row[1],
                'location_type': u'Regional Rail Station',
                'visible': True,
            }

            print 'Place:', place

            response = requests.post(
                'http://shareaboutsapi-civicworks.dotcloud.com/api/v1/datasets/bicycle-coalition/rr-stations/places/',
                data=json.dumps(place),
                headers={
                    'Content-type': u'application/json'
                },
                auth=('bicycle-coalition', 'password'),
                config={'verbose': sys.stderr})

            print 'Response:', response
#            print 'Response text:', response.text

if __name__ == '__main__':
    sys.exit(main())
